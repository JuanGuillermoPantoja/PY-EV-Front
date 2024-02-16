import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import EventsPage from "./pages/EventsPage";
import EventsFormPage from "./pages/EventsFormPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/EventContext";
import EventsClients from "./pages/EventsClients";
import EventsFormImages from "./pages/EventsFormImages";
import LoginClientsPage from "./pages/LoginClientsPage";
import RegisterClients from "./pages/RegisterClients";
import { ClientAuthProvider } from "./context/ClientContex";
import { CommentProvider } from "./context/CommentsContext";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <ClientAuthProvider>
          <CommentProvider>
            <BrowserRouter>
              {/* <Navbar /> */}
              <Routes>
                <Route path="/" element={<EventsClients />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/events-clients" element={<EventsClients />} />
                <Route path="/login-clients" element={<LoginClientsPage />} />
                <Route path="/register-clients" element={<RegisterClients />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/events" element={<EventsPage />} />
                  <Route path="/add-event" element={<EventsFormPage />} />
                  <Route path="/events/:id" element={<EventsFormPage />} />
                  <Route
                    path="/events/:id/add-eventImages"
                    element={<EventsFormImages />}
                  />
                  <Route path="/profile" element={<ProfilePage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </CommentProvider>
        </ClientAuthProvider>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
