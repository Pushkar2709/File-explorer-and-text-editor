import Link from "next/link";

export default function DisplayPath({ path }: { path: string }) {

    const links = path.split('/');

    return (
        <div className="mt-10 w-5/6 flex">
            {
                links.map((link, index) => {
                    const ref = links.slice(0, index + 1).join('/');
                    return <div key={index}>
                        <span>/</span>
                        <Link className="p-2 hover:underline" href={`/${ref}`}>{link}</Link>
                    </div>
                })
            }
        </div>
    )
}
