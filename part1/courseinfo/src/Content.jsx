const Part = (part) => {
    console.log(part)
    return (
        <p>
            {part.part} {part.exercise}
        </p>
    )

}

const Content = ({parts}) => {

    return (
        <div>
            {parts.map((part, index) => (
                <Part key={index} part={part.name} exercise={part.exercises}/>

            ))}

        </div>

    )

}

export default Content
