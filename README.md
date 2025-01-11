# Back-end

## Set up

### Install dependencies
    - Create a virtual enviroment in needed
    python -m venv venv

    - Install the required libraries
    pip install fastapi uvicorn requests beautifulsoup4 pydantic

## Run the project

In ./back-end/main.py
    python main.py

# Front-end 

## Set up 

### Install dependencies

    npm install

## Run the project

    In ./front-end/scrapeReact
    npm run dev

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