import AuthProvider from "@/context/AuthContext";

const TestGuard = () => {
  return (
    <AuthProvider>
      <div>123213</div>
    </AuthProvider>
  );
};

export default TestGuard;
