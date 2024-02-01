import LogoutButton from "@/components/web-component/LogoutButton";

export default function RBACTest () {
    return (
        <div>
            hello, only admin should be able to view this page
            <LogoutButton />
        </div>
    )
}