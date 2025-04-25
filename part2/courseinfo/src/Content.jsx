const Part = (part) => {
    console.log(part)
    return (
        <p>
            {part.part} {part.exercise}
        </p>
    )

}

const Content = ({parts}) => {
    console.log(parts)
    const total = parts.reduce((suma, part) => suma + part.exercises, 0)
    return (
        <div>
            {parts.map((part) => (
                <Part key={part.id} part={part.name} exercise={part.exercises}/>

            ))}
            <p><strong>Total of {total} exercises</strong></p>


        </div>

    )

}

export default Content
