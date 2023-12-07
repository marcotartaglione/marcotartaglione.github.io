export function Echo({args = []}) {
    return (
        <p>{args.join(" ")}</p>
    )
}

export const EchoData = {
    args: [
        {
            name: "<word>",
            type: "string",
            length: {
                min: 1,
                max: Infinity
            }
        }
    ],
    description: "Prints given string",
    manual: "Prints on the terminal the string specified"
}
