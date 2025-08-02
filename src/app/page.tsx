"use client";

import { useState, useEffect } from "react";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");
  const [jobSigned, setJobSigned] = useState(false);
  const [jobCompleted, setJobCompleted] = useState(false);
  const [invoiceGenerated, setInvoiceGenerated] = useState(false);
  const [jobCreated, setJobCreated] = useState(false);
  const [accountLinkSent, setAccountLinkSent] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (jobCompleted && !invoiceGenerated) {
      setInvoiceGenerated(true);
    }
  }, [jobCompleted, invoiceGenerated]);

  useEffect(() => {
    if (jobCreated && !accountLinkSent) {
      setAccountLinkSent(true);
    }
  }, [jobCreated, accountLinkSent]);

  const StyledButton = (
    props: React.ButtonHTMLAttributes<HTMLButtonElement>
  ) => <button className="btn btn-outline btn-secondary" {...props} />;

  const roles = [
    { label: "Seller", value: "seller" },
    { label: "Customer", value: "customer" },
    { label: "Installer", value: "installer" },
    { label: "Admin", value: "admin" },
  ];

  const LogoutButton = () => (
    <StyledButton onClick={() => setRole("")}>Back</StyledButton>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 text-base-content flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!role) {
    return (
      <div className="min-h-screen bg-base-200 text-base-content flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold">Login</h1>
        <p className="text-base-content/60">Simulate user role</p>
        <div className="flex flex-wrap justify-center gap-2">
          {roles.map(({ label, value }) => (
            <StyledButton key={value} onClick={() => setRole(value)}>
              {label}
            </StyledButton>
          ))}
        </div>
      </div>
    );
  }

  const FormField = ({
    label,
    children,
  }: {
    label: string;
    children: React.ReactNode;
  }) => (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      {children}
    </div>
  );

  if (role === "seller") {
    return (
      <div className="min-h-screen bg-base-200 text-base-content p-8">
        <h2 className="text-2xl font-bold mb-4">Seller Dashboard</h2>
        {!jobCreated ? (
          <form
            className="grid gap-4 max-w-xl"
            onSubmit={(e) => {
              e.preventDefault();
              setJobCreated(true);
            }}>
            <FormField label="Client Name">
              <input
                className="input input-bordered w-full"
                placeholder="Jane Doe"
              />
            </FormField>
            <FormField label="Client Email">
              <input
                className="input input-bordered w-full"
                placeholder="jane@example.com"
                type="email"
              />
            </FormField>
            <FormField label="Quote Info">
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Quote details..."
              />
            </FormField>
            <FormField label="Number of Isolant Bags">
              <input
                className="input input-bordered w-full"
                type="number"
                placeholder="e.g. 12"
              />
            </FormField>
            <StyledButton type="submit">Create Job</StyledButton>
          </form>
        ) : (
          <div className="space-y-4">
            <p className="text-success">✅ Job created successfully.</p>
            {accountLinkSent && (
              <p className="text-info">
                📩 Account creation link sent to client.
              </p>
            )}
          </div>
        )}
        <div className="mt-6">
          <LogoutButton />
        </div>
      </div>
    );
  }

  if (role === "customer") {
    return (
      <div className="min-h-screen bg-base-200 text-base-content p-8 space-y-6">
        <h2 className="text-2xl font-bold">Customer Dashboard</h2>
        <div className="card bg-base-100 shadow-lg p-4">
          <h3 className="card-title">Upcoming Job #123</h3>
          <p>Status: {jobSigned ? "Signed" : "Awaiting Signature"}</p>
          {!jobSigned && (
            <StyledButton onClick={() => setJobSigned(true)}>
              Sign Contract
            </StyledButton>
          )}
        </div>
        {jobCompleted && (
          <div className="card bg-base-100 shadow-lg p-4">
            <h3 className="card-title">Completed Job #123</h3>
            <p>Invoice: #INV-1234.pdf</p>
            <StyledButton>Download Invoice</StyledButton>
          </div>
        )}
        <LogoutButton />
      </div>
    );
  }

  if (role === "installer") {
    return (
      <div className="min-h-screen bg-base-200 text-base-content p-8 space-y-6">
        <h2 className="text-2xl font-bold">Installer Dashboard</h2>
        {!jobCompleted ? (
          <div className="card bg-base-100 shadow-lg p-4">
            <p>Job #123 - Ready to start</p>
            <StyledButton onClick={() => setJobCompleted(true)}>
              Upload Photos & Mark Complete
            </StyledButton>
          </div>
        ) : (
          <p className="text-success">
            Job Completed and invoice has been automatically generated
          </p>
        )}
        <LogoutButton />
      </div>
    );
  }

  if (role === "admin") {
    return (
      <div className="min-h-screen bg-base-200 text-base-content p-8 space-y-6">
        <h2 className="text-2xl font-bold">Admin Job Overview</h2>
        <div className="card bg-base-100 shadow-lg p-4">
          <p>Job #123</p>
          <p>
            Status:{" "}
            {jobCompleted ? "Completed" : jobSigned ? "Signed" : "Pending"}
          </p>
          {invoiceGenerated && <p>Invoice: #INV-1234 (Auto-generated)</p>}
        </div>
        <LogoutButton />
      </div>
    );
  }

  return null;
}
