## Commands for installing packages
python -m venv venv

in .\venv\Scripts\activate
run this command pip install fastapi uvicorn requests beautifulsoup4 pydantic

## Command for running the application
uvicorn main:app --reload

## Structure for post requests 

http://localhost:8000/scrape
{
    "url": "https://times.bg",
    "selector": {
        "tag": "a"
        "class_" "mainclass" 
    }
}

http://localhost:8000/scrape-multiple
[
    {
        "url": "https://scrapethissite.com/pages",
        "selector": {
            "tag": "p"
        }
    },
    {
        "url": "https://example.com",
        "selector": {
            "tag": "h1"
        }
    }
]
