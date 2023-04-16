import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  currentUser: {},
  userToken: null,
  surveys: [],
  setCurrentUser: () => {},
  setUserToken: () => {}
})

const tmpSurveys = [
  {
    "id": 1,
    "image_url": "data:image/jpeg;base64,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",
    "title": "TheCodeholic YouTube channel",
    "slug": "thecodeholic-youtube-channel",
    "status": true,
    "description": "My name is Zura.<br>I am Web Developer with 9+ years of experience, free educational content creator, CTO, Lecturer and father of two wonderful daughters.<br><br>The purpose of the channel is to share my several years of experience with beginner developers.<br>Teach them what I know and make my experience as a lesson for others.",
    "created_at": "2022-01-07 13:23:41",
    "updated_at": "2022-01-18 16:34:19",
    "expire_date": "2022-01-23",
    "questions": [
      {
        "id": 15,
        "type": "text",
        "question": "From which country are you?",
        "description": null
      },
      {
        "id": 16,
        "type": "checkbox",
        "question": "Which language videos do you want to see on my channel?",
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda cumque earum eos esse est ex facilis, iure laboriosam maiores neque nesciunt nulla placeat praesentium quae quos ratione, recusandae totam velit!",
        "data": {
          "options": [
            {
              "uuid": "8ee03188-9e7e-44e5-9176-7574c0beec6f",
              "text": "JavaScript"
            },
            {
              "uuid": "fe9497f2-8f05-4c82-9586-26e36736fa9e",
              "text": "PHP"
            },
            {
              "uuid": "db0f194c-d32d-4e19-929e-08f7b4e2bcc0",
              "text": "HTML + CSS"
            },
            {
              "uuid": "93273c4c-ac8f-432e-b847-e467df64ab9c",
              "text": "All of the above"
            },
            {
              "uuid": "d54818a7-ad7e-4b69-9287-16a8dc50a6cb",
              "text": "Everything Zura thinks will be good"
            }
          ]
        }
      },
      {
        "id": 17,
        "type": "select",
        "question": "Which PHP framework videos do you want to see on my channel?",
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda cumque earum eos esse est ex facilis, iure laboriosam maiores neque nesciunt nulla placeat praesentium quae quos ratione, recusandae totam velit!",
        "data": {
          "options": [
            {
              "uuid": "fb907cfe-b7a1-4b24-86fb-03f9c44aa710",
              "text": "Laravel"
            },
            {
              "uuid": "e2629262-93ca-4a7a-8129-19c765664a04",
              "text": "Yii2"
            },
            {
              "uuid": "9a11a425-d9fe-4fe9-86af-bb814e3d9271",
              "text": "Codeigniter"
            },
            {
              "uuid": "484268b1-d3aa-47f8-a185-356ed48e50fe",
              "text": "Symfony"
            }
          ]
        }
      },
      {
        "id": 18,
        "type": "radio",
        "question": "Which Laravel Framework do you love most?",
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda cumque earum eos esse est ex facilis, iure laboriosam maiores neque nesciunt nulla placeat praesentium quae quos ratione, recusandae totam velit!",
        "data": {
          "options": [
            {
              "uuid": "c02e50e6-5ebf-4344-9822-baa16502dbdb",
              "text": "Laravel 5"
            },
            {
              "uuid": "90a15aae-ef4c-4d04-aa05-8e840d4a2ded",
              "text": "Laravel 6"
            },
            {
              "uuid": "93c64532-c1eb-4bfd-bd00-ab51cafdee78",
              "text": "Laravel 7"
            },
            {
              "uuid": "51f6a704-7a86-47a4-9b2d-72bb026a3371",
              "text": "Laravel 8"
            }
          ]
        }
      },
      {
        "id": 19,
        "type": "checkbox",
        "question": "What type of projects do you want to see on my channel built with Laravel?",
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda cumque earum eos esse est ex facilis, iure laboriosam maiores neque nesciunt nulla placeat praesentium quae quos ratione, recusandae totam velit!",
        "data": {
          "options": [
            {
              "uuid": "c5519ab0-3282-4758-a34b-506052bf1342",
              "text": "REST API"
            },
            {
              "uuid": "dfbbc0af-8fff-44ae-be36-e85270041729",
              "text": "E-commerce"
            },
            {
              "uuid": "6940c122-505f-4d9d-a103-472f923fad94",
              "text": "Real Estate"
            },
            {
              "uuid": "2b3c12a4-8f3c-4276-ae59-4e9d55e849be",
              "text": "All of the above"
            }
          ]
        }
      },
      {
        "id": 22,
        "type": "textarea",
        "question": "What do you think about TheCodeholic channel?",
        "description": "Write your honest opinion. Everything is anonymous.",
        "data": []
      },
      {
        "id": 23,
        "type": "text",
        "question": "Which channel is your favorite one?",
        "description": null,
        "data": []
      }
    ]
  },
  {
    "id": 2,
    "image_url": "data:image/png;base64,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",
    "title": "React",
    "slug": "react",
    "status": true,
    "description": "React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.",
    "created_at": "2022-01-07 08:50:40",
    "updated_at": "2022-01-07 13:37:37",
    "expire_date": "2022-02-01",
    "questions": []
  },
  {
    "id": 3,
    "image_url": "data:image/png;base64,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",
    "title": "Laravel 9",
    "slug": "laravel-9",
    "status": true,
    "description": "Laravel is a web application framework with expressive, elegant syntax. We\u2019ve already laid the foundation \u2014 freeing you to create without sweating the small things.",
    "created_at": "2022-01-07 13:28:56",
    "updated_at": "2022-01-07 13:28:56",
    "expire_date": "2022-01-20",
    "questions": []
  },
]

export const ContextProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState({
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  })
  const [userToken, setUserToken] = useState('1234')
  const [surveys, setSurveys] = useState(tmpSurveys)

  return (
    <StateContext.Provider value={{
      currentUser,
      setCurrentUser,
      userToken,
      setUserToken,
      surveys
     }}>
      {children}
    </StateContext.Provider>
  )
}


export const userStateContext = () => useContext(StateContext)
