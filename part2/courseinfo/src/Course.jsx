import Header from "./Header.jsx";
import Content from "./Content.jsx";

const Course =(props) => {
    console.log(props.course)
    return(
        <div>
            <Header course={props.course}/>
            <Content parts={props.course.parts}/>
        </div>

    )

}
export default Course
