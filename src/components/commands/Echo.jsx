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
                min: 0,
                max: Infinity
            }
        }
    ],
    description: "Print given string",
    manual: "Print on the terminal the string specified"
}
