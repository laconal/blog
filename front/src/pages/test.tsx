export default function TestPage() {
    return (
        <div>
            <input type="hidden" value="hiddenValue" id="asd"/>
            <button onClick={() => {
                const hiddenValue = document.getElementById("asd") as HTMLInputElement
                console.log(hiddenValue.value)
            }}>Test</button>
        </div>
    )
}