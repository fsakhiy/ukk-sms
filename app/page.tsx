import LoginButton from "@/components/web-component/LoginButton";
import LogoutButton from "@/components/web-component/LogoutButton";

export default function HomePage() {
  return (
      <div>
        welcome to school manager, this website is currently in development..
          {/*<Button >Sign in</Button>*/}
          <LoginButton />
          <LogoutButton />
      </div>

  )
}