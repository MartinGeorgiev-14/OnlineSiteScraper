import { useState, useRef } from "react";
import scrapeService from '../services/scrapeService'
import styled from 'styled-components'
import useStore from "../hooks/useStore";

const Form = styled.form`
    background-color: #2D3748;
    text-align: center;
    width: 50%;
    margin: 1rem auto;
    border-radius: 4px;
`;

const InputDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  
    &:not(:last-child){
        border-bottom: 2px solid #4A5568;
    }
`;

const InputField = styled.input`
   flex: 1;
   min-width: 120px;
   max-width: 200px;
   padding: 0.5rem;
   border: 1px solid #ccc;
   border-radius: 4px;
   box-sizing: border-box;
   border: none;
`;

const Button = styled.button`
    padding: 0.5rem;
    border-radius: 4px;
    border: none;
    background-color: #4299E1;
    width: 5rem;
    
    &:hover {
        background-color: #3182CE;
        cursor: pointer;
    }
`

const LabelInputDiv = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 150px
`

const Label = styled.label`
    color: white;
    font-size: 1.1rem;
`

const FormScrape = ({scrapedSites, setScrapedSites }) => {
    const urlCounter = useStore(1);
    const formRef = useRef();
    const urlComponents = [];

    const scrape = async (event) => {
        event.preventDefault();
        
        const formElements = Array.from(formRef.current.querySelectorAll(".scrape-input"));
        const data = []
        const errorCounter = []

        for (let i = 0; i < formElements.length; i++) {
            const url = formElements[i].querySelector("[name = 'url']")?.value || '';
            const tag = formElements[i].querySelector("[name = 'tag']")?.value || '';
            const class_ = formElements[i].querySelector("[name = 'class_']")?.value || '';
            

            if(!url || !(tag || class_)){
                errorCounter.push(i+1)
                continue
            }
            else{
                data.push({
                    url,
                    selector: {
                        tag,
                        class_
                    }
                })
            }
        }

        if(errorCounter.length > 0){
            alert(`Please fill in URL and either Tag or Class for URL ${errorCounter.join(', ')}`)
            return;
        }

        const response = await scrapeService.getMultipleUrls(data);
        setScrapedSites(response)
    }

    const downloadContent = (event) => {
        event.preventDefault(); 

        if(scrapedSites.length <= 0){
            alert("No data to download")
            return;
        }

        const blob = new Blob([JSON.stringify(scrapedSites, null, 2)], {type: 'text/plain'})

        const url = URL.createObjectURL(blob)

        const a = document.createElement('a')
        a.href = url
        a.download = 'scraped-data.txt'
        document.body.appendChild(a)
        a.click()

        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    const clear = (event) => {
        event.preventDefault()

        setScrapedSites([])
    }

    const reset = (event) => {
        event.preventDefault()

        formRef.current.reset()
        urlCounter.clearState(1)
    }

    for (let index = 0; index < urlCounter.getState(); index++) {
        urlComponents.push(
            <InputDiv key={index} className="scrape-input">
                <InputField type="text" placeholder="Url" name="url"/>
                <InputField type="text" placeholder="Element" name="tag"/>
                <InputField type="text" placeholder="Class" name="class_"/>
            </InputDiv>
        )
    }

    return (
            <Form onSubmit={scrape} ref={formRef}>
                {urlComponents}
                <InputDiv>
                    <LabelInputDiv>
                        <Label htmlFor={'urlCounter'}>Url number:</Label>
                        <InputField type="number" value={urlCounter.getState()} name="urlCounter" onChange={(num) => urlCounter.onChange(num.target.value)}/>
                    </LabelInputDiv>                
                    <Button type="submit">Scrape</Button>
                    <Button type="button" onClick={clear}>Clear</Button>
                    <Button type="button" onClick={reset}>Reset</Button>
                    <Button type="button" onClick={downloadContent}>Download data</Button>
                </InputDiv>
            </Form>
    )
}

export default FormScrape;
