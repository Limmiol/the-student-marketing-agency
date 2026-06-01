import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { Home, Info, Briefcase, Mail, Instagram, MapPin } from "lucide-react";

import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import appCss from "../styles.css?url";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "The Students Marketing Agency" },
      {
        name: "description",
        content:
          "Tanzania's youth marketing agency. We connect brands with Gen Z and university students.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Mono:wght@400;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function SiteNav() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="tsa-nav reveal">
      <Link to="/" className="nav-logo">
        <img src="/images/logo1.png" alt="The Students Logo" />
        <div className="nav-logo-text">
          <span>The</span> Students
          <br />
          Marketing Agency
        </div>
      </Link>
      <ul>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/services">Services</Link>
        </li>
        <li>
          <Link to="/events">Events</Link>
        </li>
        <li>
          <a href="#why">Why Us</a>
        </li>
        <li>
          <a href="#industries">Industries</a>
        </li>
        <li>
          <Link to="/contact" className="nav-cta">
            Get In Touch
          </Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/profile">Account</Link>
            </li>
            
            <li>
              <button
                className="nav-logout-button"
                onClick={async () => {
                  await signOut();
                  navigate({ to: "/" });
                }}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
      <div className="mobile-bottom-nav">
        <Link to="/" className="mobile-nav-link active">
          <Home size={20} />
          <span>Home</span>
        </Link>
        <Link to="/about" className="mobile-nav-link">
          <Info size={20} />
          <span>About</span>
        </Link>
        <Link to="/services" className="mobile-nav-link">
          <Briefcase size={20} />
          <span>Services</span>
        </Link>
        <Link to="/events" className="mobile-nav-link">
          <MapPin size={20} />
          <span>Events</span>
        </Link>
        <Link to="/contact" className="mobile-nav-link">
          <Mail size={20} />
          <span>Contact</span>
        </Link>
      </div>
    </nav>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster theme="dark" position="top-right" />
        <SiteNav />
        <Outlet />
        <Footer />
      </AuthProvider>
    </QueryClientProvider>
  );
}

function Footer() {
  return (
    <footer className="tsa-footer">
      <div>
        <div className="footer-logo-wrap">
          <img src="/images/logo1.png" alt="The Students Logo" />
          <div className="footer-brand">
            The <span>Students</span> Agency
          </div>
        </div>
        <div className="footer-tagline">"Connecting Brands With The Power Of Students."</div>
        <div className="footer-contacts">
          <a href="mailto:info@studentsmarketingagency.com">
            <Mail size={14} /> info@studentsmarketingagency.com
          </a>
          <a href="https://instagram.com/studentsmarketingagency">
            <Instagram size={14} /> @studentsmarketingagency
          </a>
          <span>
            <MapPin size={14} /> Tanzania
          </span>
        </div>
      </div>
      <div className="footer-right">
        <div className="social-links">
          <a href="https://instagram.com/studentsmarketingagency" title="Instagram">
            <Instagram size={18} />
          </a>
          <a href="mailto:info@studentsmarketingagency.com" title="Email">
            <Mail size={18} />
          </a>
        </div>
        <p>© {new Date().getFullYear()} The Students Marketing Agency</p>
        <p>Tanzania · Youth · Culture · Growth</p>
      </div>
    </footer>
  );
}
