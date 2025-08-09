export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          {children}
        </div>
      </body>
    </html>
  );
}