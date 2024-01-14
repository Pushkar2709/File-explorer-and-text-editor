import DisplayFiles from "@/components/DisplayFiles";
import DisplayPath from "@/components/DisplayPath";
import New from "@/components/New";

export default function Home() {

	return (
		<div className="w-screen h-screen flex flex-col items-center">
			<div className="flex w-5/6 mt-10">
                <DisplayPath path={`.`} />
                <div className="ml-auto">
                    <New isFolder={false} path="." />
                    <New isFolder={true} path="." />
                </div>
            </div>
			<DisplayFiles dir="." />
		</div>
	)
}
