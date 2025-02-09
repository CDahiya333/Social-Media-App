//Auth Controller Functions
export const signup = async (req,res) =>{
    res.json({ data: "SignUP Endpoint" });
}

export const login = async (req,res) =>{
    res.json({ data: "login Endpoint" });
}

export const logout = async (req,res) =>{
    res.json({ data: "logout Endpoint" });
}
