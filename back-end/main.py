from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse
from urllib.robotparser import RobotFileParser
from typing import List, Optional

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScrapingRequest(BaseModel):
    url: str
    selector: dict

class ScrapingResult(BaseModel):
    url: str
    tag: str
    class_: str
    content: Optional[str] = None
    error: Optional[str] = None

def is_allowed_to_scrape(url: str) -> bool:
    parsed_url = urlparse(url)
    robots_url = f"{parsed_url.scheme}://{parsed_url.netloc}/robots.txt"
    rp = RobotFileParser()
    rp.set_url(robots_url)
    try:
        rp.read()
        return rp.can_fetch("*", url)
    except:
        return False

def fetch_content(url: str, selector: dict) -> str:
    if not is_allowed_to_scrape(url):
        raise HTTPException(status_code=403, detail="Scraping not allowed by robots.txt")

    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=400, detail=f"Error fetching URL: {str(e)}")

    soup = BeautifulSoup(response.content, 'html.parser')
    elements = soup.find_all(selector['tag'], class_=selector.get('class_'))
    text = [element.get_text().strip() for element in elements]
    return "| ".join(text)

@app.post("/scrape", response_model=ScrapingResult)
async def scrape_site(request: ScrapingRequest):
    content = fetch_content(request.url, request.selector)
    return ScrapingResult(url=request.url, content=content)

@app.post("/scrape-multiple", response_model=List[ScrapingResult])
async def scrape_multiple_sites(requests: List[ScrapingRequest]):
    results = []
    for req in requests:
        try:
            content = fetch_content(req.url, req.selector)
            results.append(ScrapingResult(url=req.url, tag=req.selector['tag'], class_=req.selector['class_'], content=content))
        except HTTPException as e:
            results.append(ScrapingResult(url=req.url, tag=req.selector['tag'], class_=req.selector['class_'], error=f"Error: {str(e.detail)}"))
    return results

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)