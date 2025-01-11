import styled from "styled-components"

const Container = styled.div`
    background-color: #F8F9FA;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem auto;
    width: 50%;
    border-radius: 4px;
`

const Heading = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    width: 100%;
    font-size: 1.4rem;
    padding: 0.5rem;
    border-radius: 4px 4px 0 0;
    border-bottom: 5px solid black;
    background-color: #2D3748;
    color: white;

    p:first-child{
        overflow: hidden;
    }
`

const Span = styled.span`
    font-weight: bold
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
    background-color: #4A5568;
    color: white;

    p{
        padding: 1rem;
        border-left: 1px solid black;
        border-right: 1px solid black;
        border-bottom: 1px solid black;
        font-size: 1.2rem;
    }

    .error{
        color: red;
    }
`

const ScrapedInfo = ({ data }) => {
    const content = data.content ? data.content.split("|").filter(el => el != ' ') : [] //[] = null

    return (
        <>
            <Container>
                <Heading>
                    <p>Scraped url: <Span>{data.url}</Span></p>
                    {data.tag ? <p>Tag: <Span>{`<${data.tag}>`}</Span></p> : <p>No tag</p>} 
                    {data.class_ ? <p>Class: <Span>{`.${data.class_}`}</Span></p> : <p>No class</p>}
                    {content.length > 0 ? <p>Number of elements: <Span>{data.content.length}</Span></p> : null}
                </Heading>
                <Content>
                    {data.error ?
                            <p className="error">{data.error}</p>
                            :
                            content.map((el, i) => <p key={el + i}>{el}</p>)
                        }
                    
                </Content>
            </Container>
        </>
    )
}

export default ScrapedInfo