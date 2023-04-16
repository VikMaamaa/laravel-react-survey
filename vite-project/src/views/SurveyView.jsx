import { useState } from "react";
import PageComponent from "../components/PageComponent";

export default function SurveyView() {
const [survey, setSurvey] = useState({
  title:"",
  slug: "",
  status: false,
  description: "",
  image:  null,
  image_url:  null,
  expire_date: "",
  questions: []
})

  return(
    <PageComponent title={"Create new Survey"}>
      <form action="#" method="POST" onSubmit={onSubmit}>

      </form>
    </PageComponent>
  )
}
