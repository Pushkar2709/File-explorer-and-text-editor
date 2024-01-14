import DisplayFiles from "@/components/DisplayFiles";
import DisplayPath from "@/components/DisplayPath";

export default function Home() {

	return (
		<div className="w-screen h-screen flex flex-col items-center">
			<DisplayPath path="."/>
			<DisplayFiles dir="." />
		</div>
	)
}
