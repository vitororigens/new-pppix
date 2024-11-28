function verificationPassSecurity(
  pass: string
): void | boolean | "empty" | "wrong" {
  if (pass === "emergency") return false;
  if (pass === "123456") return true;
  if (pass === "") return "empty";
  if (pass !== "emergency" && pass !== "123456") return "wrong";
}

export default verificationPassSecurity;
