import {useState} from 'react';
import { v4 } from 'uuid';
import axios from 'axios';

export default function Create() {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")

    /*
    0. Data
    1. 데이터 업데이트 방법
    1. question add btn

    사람들의 survey를 만들기
    default 는 체크박스 질문 (바꿀수 있음)
    질문 더하기, 질문 지우기
    질문이 체크박스이거나 라디오이면 
    질문의 옵션을 만들어야 한다.

    기능

    question:
    uuid
    title, description
    questionType, # radio, checkbox, text, longText, ...
    selectOptions = [
      {
        uuid: ,
        title: ,
        description,
      }, ..
    ]
    */



  const [questions, setQuestions]= useState([])

  const updateQuestionTitle=(uuid, text)=>{
    const index=questions.findIndex(q=>q.uuid===uuid)
    if (index===-1) return false

    const cp=[...questions]
    cp[index].title=text
    setQuestions(cp)
  }

  const updateQustiondesc=(uuid, text)=>{
    const index=questions.findIndex(q=>q.uuid===uuid)
    if (index===-1) return false
    const cp=[...questions]

    cp[index].desc=text
    setQuestions(cp)
  }

  const updateQuestionType=(uuid, qtype) =>{
    const index = questions.findIndex(q=>q.uuid===uuid)
    if (index===-1) return false

    const cp=[...questions]
    cp[index].qtype=qtype
    setQuestions(cp)

  }

  const addQuestion=()=>{
    const cp=[...questions]
    cp.push(
      {
        uuid : v4(),
        qtype: 'checkbox',
        title: 'default',
        desc: 'default',
        options : [
          {
            uuid : v4(),
            title : 'default' ,
            desc : 'default'
          }
        ]
      }
    )
    setQuestions(cp)
  }


  

  const deleteQuestion=(uuid)=>{
    
    const index=questions.findIndex(q=>q.uuid===uuid)
    if (index===-1) return false
    const cp=[...questions]

    cp.splice(index, 1)
    setQuestions(cp)
  }

  const addOption=(uuid) =>{
    const index = questions.findIndex(q=>q.uuid===uuid)
    if (index===-1) return false

    const cp=[...questions]
    cp[index].options.push(

      { uuid : v4(),
        title : "default",
        desc : "default"}
    )
    setQuestions(cp)
  }

  const deleteOption=(uuid, uuidO) =>{
    const index=questions.findIndex(q=>q.uuid===uuid)
    if (index===-1) return false

    const cp=[...questions]
    const indexO=cp[index].options.findIndex(o=>o.uuid===uuidO)
    if (indexO===-1) return false
    cp[index].options.splice(indexO, 1)
    setQuestions(cp)
  }

  
  const updateOptiontitle=(uuid, uuidO, text)=>{
    const index=questions.findIndex(q=>q.uuid===uuid)
    if (index===-1) return false

    const cp=[...questions]
    const indexO=cp[index].options.findIndex(o=>o.uuid===uuidO)
    if (indexO===-1) return false

    cp[index].options[indexO].title=text
    setQuestions(cp)
  }

  const updateOptiondesc=(uuid, uuidO, text)=>{
    const index=questions.findIndex(q=>q.uuid===uuid)
    if (index===-1) return false

    const cp=[...questions]
    const indexO=cp[index].options.findIndex(o=>o.uuid===uuidO)
    if (indexO===-1) return false

    cp[index].options[indexO].desc=text
    setQuestions(cp)
  }

  const submit=async()=>{
    const url= "http://sth.deathvalleyyy.com/"
    axios.post(url,{title: title, desc: desc, questions: questions})
    .then((response) => {console.log(response.data) })
    .catch((response) => {console.log('Error!') })
  }


  return (
      <div>
        -Form Title
        <textarea style={{marginLeft: 10, marginTop:20}} value={title} onChange={e => setTitle(e.target.value)}/>
        -From Desc
        <textarea style={{marginLeft: 10, marginTop:20}} value={desc} onChange={e => setDesc(e.target.value)}/>
        <hr/>
        <br></br>

        {questions.map((question,index) =>{ 
          return(
            <Question question={question} key={index}
            updateQuestionTitle= {updateQuestionTitle}
            updateQuestionType={updateQuestionType}
            updateQuestionDesc={updateQustiondesc}
            deleteQuestion={deleteQuestion}
            addQuestion={addQuestion}

            addOption={addOption}
            deleteOption={deleteOption}
            updateOptionDesc={updateOptiondesc}
            updateOptiontitle={updateOptiontitle}/>

            
          )
        })
        }
        <button style={{marginTop: 0}} onClick={e=>addQuestion()}>add question</button>
        <br/>
        <button style={{marginTop: 20}} onClick={e=>submit()}>submit</button>
      </div>
    )
}




const Question = ({key, question , updateQuestionTitle, addOption ,deleteOption, updateQuestionType, addQuestion, deleteQuestion, updateOptiontitle, updateOptionDesc, updateQuestionDesc})=>{
  return <>
   Question title <textarea style={{marginLeft: 10}} value={question.title} onChange={e=>updateQuestionTitle(question.uuid, e.target.value)}/>
   &nbsp;&nbsp;
   Question description <textarea style={{marginLeft: 10}} value={question.desc} onChange={e=>updateQuestionDesc(question.uuid, e.target.value)}/>
   <br/>
   <span style={{paddingLeft: 10}}>
   Question Type: 
   </span>
   <select value={question.qtype} onChange={e => updateQuestionType(question.uuid, e.target.value)}>
    <option value="checkbox">checkbox</option>
    <option value="radio">radio</option>
    <option value="text">text</option>
   </select>
    {
    (question.qtype=== "checkbox")&&
    <>
        <div style={{marginBottom: 40, paddingLeft: 20}}>
          <span>Options</span>
          <div style={{paddingLeft:20}}>
            {
              question.options.map((option, index)=>{
                return<div key={index}>
                  Option &nbsp;{index}&nbsp;//&nbsp;&nbsp;
                  Option title: <textarea style={{marginLeft: 10}} value={option.title} onChange={e=>updateOptiontitle(question.uuid, option.uuid, e.target.value)}/>
                  &nbsp;&nbsp;&nbsp; 
                  Option description: <textarea style={{marginLeft: 10}} value={option.desc} onChange={e=>updateOptionDesc(question.uuid, option.uuid, e.target.value)}/>
                  <button style={{marginLeft: 5}} onClick={e=>deleteOption(question.uuid,option.uuid)}>delete option</button>
                  <br/>
                </div>
                
              })
            }
            
            <button style={{marginTop: 5}} onClick={e=>addOption(question.uuid)}>add option</button>
          </div>
          <button style={{marginLeft: -20, marginTop: 10}} onClick={e=>deleteQuestion(question.uuid)}>delete question</button>
          <hr style={{marginLeft: -20}}/>
        </div>
        
     </>
    } 
    {
    (question.qtype ==="radio")&&
      <>
        <div style={{marginBottom: 40, paddingLeft: 20}}>
          <span>options</span>
          <div style={{paddingLeft:20}}>
            {
              question.options.map((option, index)=>{
                return<div key={index}>
                  Option &nbsp;{index}&nbsp;//&nbsp;&nbsp;
                  Option title: <textarea style={{marginLeft: 10}} value={option.title} onChange={e=>updateOptiontitle(question.uuid, option.uuid, e.target.value)}/>
                  &nbsp;&nbsp;&nbsp; Option description: <textarea style={{marginLeft: 10}} value={option.desc} onChange={e=>updateOptionDesc(question.uuid, option.uuid, e.target.value)}/>
                  <button style={{marginLeft: 5}} onClick={e=>deleteOption(question.uuid,option.uuid)}>delete option</button>
                  <br/>
                </div>
              })
            }
    
            <button style={{marginTop: 5}} onClick={e=>addOption(question.uuid)}>add option</button>
          </div>
          <button style={{marginLeft: -20, marginTop: 10}} onClick={e=>deleteQuestion(question.uuid)}>delete question</button>
          <hr style={{marginLeft: -20}}/>
        </div>
        
      </>
    }
    {
    (question.qtype==="text") &&
      <>
        <div style={{marginBottom: 40}}>
        <button style={{ marginTop: 10}} onClick={e=>deleteQuestion(question.uuid)}>delete question</button>
        <hr style={{marginLeft: 0}}/>
        </div>
      </>
    }
  </>
}



