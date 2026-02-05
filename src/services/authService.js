// src/services/authService.js
// Frontend mock auth service (backend will replace this later)

export function loginUser(email, password) {
  if (!email || !password) {
    throw new Error("Email and password required");
  }

  // role decision (mock)
  if (email === "admin@smarttask.ai") {
    return {
      role: "admin",
      user: {
        name: "Admin User",
        email,
        role: "admin",
      },
    };
  }

  if (email === "manager@smarttask.ai") {
    return {
      role: "manager",
      user: {
        name: "Manager User",
        email,
        role: "manager",
      },
    };
  }

  // default → employee
  return {
    role: "employee",
    user: {
      name: "Employee User",
      email,
      role: "employee",
    },
  };
}
// src/services/authService.js

export function registerUser(name, email, password) {
  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  // mock role decision
  let role = "employee";
  if (email === "admin@smarttask.ai") role = "admin";
  else if (email === "manager@smarttask.ai") role = "manager";

  return {
    role,
    user: {
      name,
      email,
      role,
    },
  };
}
// src/services/authService.js

export function resetPassword(email) {
  if (!email) {
    throw new Error("Email is required");
  }

  // mock success (backend will handle real email sending)
  return {
    success: true,
    message: "If this email exists, a reset link has been sent.",
  };
}
