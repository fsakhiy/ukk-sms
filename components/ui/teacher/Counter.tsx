interface infoCount {
    name: string,
    count: number
}

export default function InformationCounter({name, count}: infoCount) {
    return (
        <div className={'flex flex-col border p-2 rounded-lg'}>
            <p className={'flex underline'}>{name}:</p>
            <p className={'text-2xl mt-auto flex'}>{count}</p>
        </div>
    )
}