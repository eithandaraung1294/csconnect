import { Routes, Route, Navigate  } from "react-router-dom";
import { Layout, BlogLayout } from "@/widgets/layout";
import { Home, Profile, SignIn, SignUp , PostDetail, Blog, SubMenuDetail} from "@/pages";
import PersistLogin from "./components/persist-login/PersistLogin";
import RequireAuth from "./components/require-auth/RequireAuth";
import { PostProvider } from "./context/PostContext";

function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route element={<Layout />} >
          <Route path="/home" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/detail" element={<SubMenuDetail />} />
         
          <Route element={<RequireAuth />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
        
        <Route  element={<BlogLayout />} >
            <Route path="/blog" element={<Blog />} />
            <Route 
              path="/blog/watch" 
              element={
                <PostProvider>
                  <PostDetail />
                </PostProvider>
              } 
            />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default App;
