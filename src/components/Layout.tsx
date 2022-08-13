//@ts-nocheck
import Head from "next/head"
type LayoutProps = {
    children: React.ReactNode
}

export function Layout({children}: LayoutProps) {
    return (
        <>
            <Head>
                <title>Marvel Heroes</title>
                <meta name="description" content="Marvel Heroes" />
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Righteous&display=swap" rel="stylesheet"/>
            </Head>
            {
                    children
            }
        </>
    )
}