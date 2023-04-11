interface TitleProps {
    titleText: string
}

export function Title({ titleText }: TitleProps) {
    return <h2 className="text-2xl font-bold">{titleText}</h2>
}