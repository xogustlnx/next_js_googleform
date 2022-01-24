import { useState } from "react";
import { useRouter } from "next/router";
import App from "next/app";

export default function Googleform() {
    const router =useRouter()
    const {id} = router.query

    const url= `https://sth.deathvalleyyy.com/${id}`
    const result= await axios.get(url)

    formTitle= result.title
    formDesc= result.desc
    formQuestions= result.formQuestions

    return<>
        <div id='formtitle'>
            form title: {formTitle}
        </div>

        <div id="formdesc">
            form title: {formDesc}
        </div>

        <div id='formquestions'>
            {formQuestions.map((formQuestion, index)=>{
                return<>
                    <div id='questiontitle'>
                        question title: {formQuestion.title}
                    </div>

                    <div id='questiondesc'>
                        form title: {formQuestion.desc}
                    </div>

                    <div id='options'>
                        {
                        (formQuestion.qType==="checkbox") &&
                        <>
                        options
                            {formQuestion.FormQuestionOptions.map((formQuestionOption, index)=>{
                            return<>
                                <input type={"checkbox"} value={`${formQuestionOption.title}, ${formQuestionOption.desc}`}>
                                </input>
                            </>
                            })}
                        </>}

                        {
                        (formQuestion.qType==="radio") &&
                        <>
                        options
                            {formQuestion.FormQuestionOptions.map((formQuestionOption, index)=>{
                            return<>
                                <input type={"radio"} value={`${formQuestionOption.title}, ${formQuestionOption.desc}`}>
                                </input>
                            </>
                            })}
                        </>}

                        {
                        (formQuestion.qType==="text") &&
                        <>
                        </>}
                        
                    </div>
                </>
            })}
        </div>

    </>


}