import FormScrape from "./components/FormScrape"
import ScrapedInfo from "./components/ScrapedInfo"
import '../src/styles.css'
import styled from "styled-components"
import { useState } from "react"
import useStore from '../src/hooks/useStore'

const Heading = styled.h1`
  text-align: center;
  margin-top: 1rem;
`

function App() {
  const scrapedSites = useStore([])

  return (
    <>
    <Heading>Online Scraper</Heading>
    <FormScrape scrapedSites={scrapedSites.getState} setScrapedSites={scrapedSites.onChange}/>
    {scrapedSites.getState().map(data => {
      return (
        <ScrapedInfo key={data.url} data={data}/>
      )
    })}

    </>
  )
}

export default App
