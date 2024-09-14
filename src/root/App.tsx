import { AuthForms } from "@/auth/auth-forms";
import UserDropDown from "@/user/user-dropdown";
import { Route, Routes } from "react-router-dom";

const App = () => {
  const PageRouting = () => {
    return (
      <Routes>
        <Route path="/auth" element={<AuthForms />} />
        <Route path="/" element={<UserDropDown />} />
      </Routes>
    );
  };
  return (
    <section>
      <PageRouting />
    </section>
  );
};

export default App;
