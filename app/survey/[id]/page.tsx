'use client'
import { useCallback, useEffect } from 'react'
import AnswerForm from './components/AnswerForm'
import LoadingSpinner from '@/app/components/LoadingSpinner'
import { useAppContext } from '@/app/context/AppContext'
import { Answer, QuestionType } from '@/app/models/types'

export default function FillSurvey({ params }: { params: { id: string } }) {
  const { setName, setQuestions, questions, name } = useAppContext()

  const getSurvey = useCallback(async () => {
    const res = await fetch(`/survey/${params.id}/api`)
    const data = await res.json()
    setName(data.surveyName)
    setQuestions([...data.questions])
  }, [params.id, setName, setQuestions])

  const submitSurvey = async (answers: Answer[]) => {
    const res = await fetch(`/survey/${params.id}/api`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        answers: answers,
        id: params.id
      })
    })
    const data = await res.json()
    console.log(data)
  }

  useEffect(() => {
    getSurvey()
  }, [getSurvey])

  if (questions.length === 0 || questions[0].type == QuestionType.NOT_DECIDED) return <LoadingSpinner />

  return (
    <main className='flex flex-col h-screen text-white'>
      <nav className='flex justify-center p-3'>
        <h1 className='text-2xl'>{name}</h1>
      </nav>
      <section className='flex flex-col justify-between items-center h-full'>
        <AnswerForm submitSurvey={submitSurvey} />
      </section>
    </main>
  )
}
