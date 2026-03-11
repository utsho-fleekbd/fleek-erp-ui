import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Zap, ArrowRight, BarChart3, ShoppingCart, Package, Users, Truck, Globe,
  Shield, CreditCard, CheckCircle, Star, ChevronRight, Megaphone,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const features = [
  { icon: ShoppingCart, title: "Order Management", desc: "Track orders from placement to delivery with real-time status updates and automated workflows." },
  { icon: Package, title: "Product & Inventory", desc: "Manage products, categories, stock levels, and barcodes across multiple warehouses." },
  { icon: Users, title: "Customer CRM", desc: "Complete customer profiles, order history, and insights to drive retention." },
  { icon: Truck, title: "Courier Integration", desc: "Connect with multiple courier services, manage delivery zones, and track shipments." },
  { icon: BarChart3, title: "Analytics & Reports", desc: "Data-driven dashboards with revenue analytics, order insights, and performance tracking." },
  { icon: CreditCard, title: "Finance & Payments", desc: "Multi-gateway payment processing, expense tracking, and invoice generation." },
  { icon: Globe, title: "Website Builder", desc: "Create stunning e-commerce websites with AI-powered generation and templates." },
  { icon: Megaphone, title: "Marketing Suite", desc: "SMS campaigns, promotional tools, and AI marketing assistant for growth." },
];

const stats = [
  { value: "50K+", label: "Orders Processed" },
  { value: "1,200+", label: "Active Businesses" },
  { value: "99.9%", label: "Uptime" },
  { value: "$12M+", label: "Revenue Managed" },
];

const testimonials = [
  { name: "Sarah Chen", role: "CEO, FashionFlow", text: "Fleek ERP transformed how we manage our e-commerce operations. The dashboard alone saved us 10 hours per week.", rating: 5 },
  { name: "Marcus Johnson", role: "COO, TechMart", text: "The courier integration and order management features are best-in-class. Highly recommend!", rating: 5 },
  { name: "Elena Rodriguez", role: "Founder, StyleHub", text: "From inventory to marketing, everything we need is in one place. Game changer.", rating: 5 },
];

const pricingPlans = [
  { name: "Starter", price: "$29", period: "/month", features: ["Up to 500 orders/month", "2 team members", "Basic analytics", "Email support"], highlighted: false },
  { name: "Professional", price: "$79", period: "/month", features: ["Unlimited orders", "10 team members", "Advanced analytics", "Priority support", "API access", "Custom reports"], highlighted: true },
  { name: "Enterprise", price: "$199", period: "/month", features: ["Everything in Pro", "Unlimited team", "Custom integrations", "Dedicated account manager", "SLA guarantee", "On-premise option"], highlighted: false },
];

export default function LandingPage() {
  const hero = useInView();
  const feat = useInView();
  const statSection = useInView();
  const test = useInView();
  const pricing = useInView();
  const cta = useInView();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold">Fleek ERP</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#stats" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Stats</a>
            <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Testimonials</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link to="/login"><Button variant="ghost" size="sm">Sign In</Button></Link>
            <Link to="/dashboard"><Button size="sm" className="gap-1">Get Started <ArrowRight className="h-3.5 w-3.5" /></Button></Link>
          </div>
        </div>
      </nav>

      {/* Hero - Indigo gradient */}
      <section ref={hero.ref} className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/5 py-20 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(var(--primary)/0.15),transparent)]" />
        <div className={`relative mx-auto max-w-7xl px-4 sm:px-6 text-center transition-all duration-1000 ${hero.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary mb-6">
            <Zap className="h-3.5 w-3.5" /> Now with AI-powered features
          </div>
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            The <span className="text-primary">all-in-one</span> ERP for e-commerce
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Manage orders, products, inventory, finances, marketing, and more — all from a single powerful dashboard.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link to="/dashboard"><Button size="lg" className="gap-2 px-8 text-base">Start Free Trial <ArrowRight className="h-4 w-4" /></Button></Link>
            <Link to="/dashboard"><Button variant="outline" size="lg" className="gap-2 px-8 text-base">View Demo</Button></Link>
          </div>
        </div>
        {/* Decorative floating elements */}
        <div className="absolute -bottom-4 left-1/4 h-24 w-24 rounded-full bg-primary/10 animate-float" />
        <div className="absolute top-20 right-1/4 h-16 w-16 rounded-full bg-primary/10 animate-float stagger-2" />
      </section>

      {/* Stats - Dark/Teal section */}
      <section id="stats" ref={statSection.ref} className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-900 dark:via-teal-900 dark:to-cyan-900 py-16">
        <div className={`mx-auto max-w-7xl px-4 sm:px-6 transition-all duration-700 ${statSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} className={`text-center transition-all duration-500 ${statSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: `${i * 150}ms` }}>
                <div className="text-3xl font-bold text-white sm:text-4xl">{s.value}</div>
                <div className="mt-1 text-sm text-white/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Purple-tinted bg */}
      <section id="features" ref={feat.ref} className="bg-gradient-to-b from-background via-primary/[0.02] to-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className={`text-center transition-all duration-700 ${feat.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl font-bold sm:text-4xl">Everything you need to scale</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              A complete suite of tools designed for modern e-commerce businesses. No integrations needed.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`group rounded-xl border border-border bg-card p-6 transition-all duration-500 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 ${feat.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-sm font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Warm orange/amber gradient */}
      <section id="testimonials" ref={test.ref} className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950/20 dark:via-orange-950/20 dark:to-yellow-950/20 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className={`text-center transition-all duration-700 ${test.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl font-bold sm:text-4xl">Loved by businesses</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">See what our customers have to say about Fleek ERP.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className={`rounded-xl border border-border bg-card p-6 transition-all duration-500 hover:shadow-lg ${test.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">"{t.text}"</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - Blue/Indigo tint */}
      <section id="pricing" ref={pricing.ref} className="bg-gradient-to-b from-background via-primary/[0.03] to-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className={`text-center transition-all duration-700 ${pricing.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl font-bold sm:text-4xl">Simple, transparent pricing</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Start free, scale as you grow. No hidden fees.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pricingPlans.map((plan, i) => (
              <div
                key={plan.name}
                className={`relative rounded-xl border p-6 transition-all duration-500 hover:-translate-y-1 ${
                  plan.highlighted
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                    : "border-border bg-card"
                } ${pricing.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-medium text-primary-foreground">
                    Most Popular
                  </div>
                )}
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-success shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button className="mt-6 w-full" variant={plan.highlighted ? "default" : "outline"}>
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Gradient */}
      <section ref={cta.ref} className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 py-20">
        <div className={`mx-auto max-w-3xl px-4 sm:px-6 text-center transition-all duration-700 ${cta.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl">
            Ready to streamline your business?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Join 1,200+ businesses already using Fleek ERP to automate their e-commerce operations.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="gap-2 px-8 text-base">
                Start Free Trial <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="gap-2 border-primary-foreground/30 px-8 text-base text-primary-foreground hover:bg-primary-foreground/10">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded bg-primary">
                  <Zap className="h-3.5 w-3.5 text-primary-foreground" />
                </div>
                <span className="font-semibold">Fleek ERP</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">The all-in-one ERP platform for modern e-commerce businesses.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Product</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-foreground transition-colors cursor-pointer">Features</li>
                <li className="hover:text-foreground transition-colors cursor-pointer">Pricing</li>
                <li className="hover:text-foreground transition-colors cursor-pointer">Integrations</li>
                <li className="hover:text-foreground transition-colors cursor-pointer">Changelog</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Company</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-foreground transition-colors cursor-pointer">About</li>
                <li className="hover:text-foreground transition-colors cursor-pointer">Blog</li>
                <li className="hover:text-foreground transition-colors cursor-pointer">Careers</li>
                <li className="hover:text-foreground transition-colors cursor-pointer">Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Legal</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-foreground transition-colors cursor-pointer">Privacy</li>
                <li className="hover:text-foreground transition-colors cursor-pointer">Terms</li>
                <li className="hover:text-foreground transition-colors cursor-pointer">Security</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
            © 2026 Fleek ERP. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
