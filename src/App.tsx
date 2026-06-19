import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/Dashboard/OtherPage/NotFound";
import UserProfiles from "./pages/Settings/UserProfiles";


import BasicTables from "./pages/Dashboard/Tables/BasicTables";
import FormElements from "./pages/Dashboard/Forms/FormElements";

import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import SocialMedia from "./pages/Settings/SocialMedia";
import LogoFavicon from "./pages/Settings/LogoFavicon";
import EmailTemplate from "./pages/Settings/EmailTemplate";
import Smtp from "./pages/Settings/Smtp";
import AddTestimonial from "./pages/Testimonials/AddTestimonial";
import Calendar from "./pages/Dashboard/Calendar";
import Alerts from "./pages/Dashboard/UiElements/Alerts";
import Avatars from "./pages/Dashboard/UiElements/Avatars";
import Badges from "./pages/Dashboard/UiElements/Badges";
import Buttons from "./pages/Dashboard/UiElements/Buttons";
import Images from "./pages/Dashboard/UiElements/Images";
import Videos from "./pages/Dashboard/UiElements/Videos";
import LineChart from "./pages/Dashboard/Charts/LineChart";
import BarChart from "./pages/Dashboard/Charts/BarChart";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AddPortfolio from "./pages/Portfolio/AddPortfolio";
import AddBlog from "./pages/Blog/AddBlog";
import BlogList from "./pages/Blog/BlogList";
import CategoryListing from "./pages/Blog/CategoryListing";
import PortfolioList from "./pages/Portfolio/PortfolioList";
import PortfolioCategoryListing from "./pages/Portfolio/PortfolioCategoryListing";
import TestimonialList from "./pages/Testimonials/TestimonialList";
import LoginHistoryList from "./pages/LoginHistory/LoginHistoryList";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route index path="/" element={<Home />} />

            {/* Others Page */}

            <Route path="/calendar" element={<Calendar />} />
          

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />

            {/* Settings */}

            <Route path="/settings/logo-favicon" element={<LogoFavicon />} />
            <Route path="/settings/email-templates" element={<EmailTemplate />} />
            <Route path="/settings/smtp-settings" element={<Smtp />} />
            <Route path="/settings/social-media" element={<SocialMedia />} />
            <Route path="/profile" element={<UserProfiles />} />

            {/* Blogs */}
            <Route path="/blogs/add" element={<AddBlog />} />
            <Route path="/blogs/add/:id" element={<AddBlog />} />
            <Route path="/blogs/list" element={<BlogList />} />
            <Route path="/blogs/category-listing" element={<CategoryListing />} />

            {/* Portfolio */}
            <Route path="/portfolio/add" element={<AddPortfolio />} />
            <Route path="/portfolio/add/:id" element={<AddPortfolio />} />
            <Route path="/portfolio/list" element={<PortfolioList />} />
            <Route path="/portfolio/category-listing" element={<PortfolioCategoryListing />} />

            {/* Testimonials */}
            <Route path="/testimonials/add" element={<AddTestimonial />} />
            <Route path="/testimonials/add/:id" element={<AddTestimonial />} />
            <Route path="/testimonials/list" element={<TestimonialList />} />

            {/* Login History */}
            <Route path="/login-history" element={<LoginHistoryList />} />
            
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}
