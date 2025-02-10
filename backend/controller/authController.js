// import User from "../models/user.model.js"
// import User from "../models/user.model.js"
// import { errorHandler } from "../utils/error.js"
// import bcryptjs from "bcryptjs"
// import jwt from "jsonwebtoken"

// export const signup = async(req,res,next) => {
//     const {username,email,password} = req.body

//     const isValidUser = await User.findOne({email})
//     if(isValidUser){
//         return next(errorHandler(400,"User Already Exists"))
//     }

//     const hashedPassword =  bcryptjs.hashSync(password,10)

//     const newUser = new User({
//         username,
//         email,
//         password:hashedPassword
//     })
//     try{
//         await newUser.save()

//         res.status(201).json({
//             success:true,
//             message:"User Created Successfully"
//         })
//     }
//     catch(error){
//         next(error)
//     }
// }

// export const signin = async(req,res,next) =>{
//     const{email,password} = req.body

//     try{
//         const validUser = await User.findOne({email});
//         if(!validUser){
//             return next(errorHandler(404,"User not found"))
//         }

//         const validPassword = bcryptjs.compareSync(password,validUser.password)

//         if(!validPassword){
//             return next(errorHandler(401,"Wrong credentials"))
//         }

//         const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET)
//         const {password:pass,...rest} = validUser._doc
//         res.cookie("access_token",token,{httpOnly:true}).status(200).json({
//             success:true,
//             message:"Login Successfull",
//             rest
//         })
//     }catch(error){
//         next(error)
//     }
// }

// export const signout = async (req, res, next) => {
//     try {
//       res.clearCookie("access_token")
  
//       res.status(200).json({
//         success: true,
//         message: "User logged out successfully",
//       })
//     } catch (error) {
//       next(error)
//     }
//   }














// import User from "../models/user.model.js"
// import { errorHandler } from "../utils/error.js"
// import bcryptjs from "bcryptjs"
// import jwt from "jsonwebtoken"

// export const signup = async (req, res, next) => {
//   const { username, email, password } = req.body

//   const isValidUser = await User.findOne({ email })

//   if (isValidUser) {
//     return next(errorHandler(400, "User already Exist"))
//   }

//   const hashedPassword = bcryptjs.hashSync(password, 10)

//   const newUser = new User({
//     username,
//     email,
//     password: hashedPassword,
//   })

//   try {
//     await newUser.save()

//     res.status(201).json({
//       success: true,
//       message: "User Created Successfully",
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// export const signin = async (req, res, next) => {
//   const { email, password } = req.body

//   try {
//     const validUser = await User.findOne({ email })

//     if (!validUser) {
//       return next(errorHandler(404, "User not found"))
//     }

//     const validPassword = bcryptjs.compareSync(password, validUser.password)

//     if (!validPassword) {
//       return next(errorHandler(401, "Wrong Credentials"))
//     }

//     const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)

//     const { password: pass, ...rest } = validUser._doc

//     res.cookie("access_token", token, { httpOnly: true }).status(200).json({
//       success: true,
//       message: "Login Successful!",
//       rest,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// export const signout = async (req, res, next) => {
//   try {
//     res.clearCookie("access_token")

//     res.status(200).json({
//       success: true,
//       message: "User logged out successfully",
//     })
//   } catch (error) {
//     next(error)
//   }
// }




import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * @desc User Signup
 * @route POST /api/auth/signup
 * @access Public
 */
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(errorHandler(400, "User already exists"));
    }

    // Hash password before storing in DB
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate JWT Token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const { password: pass, ...rest } = newUser._doc;

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    })
      .status(201)
      .json({
        success: true,
        message: "User created successfully",
        token, // Send token to frontend
        user: rest,
      });

  } catch (error) {
    next(error);
  }
};

/**
 * @desc User Signin
 * @route POST /api/auth/signin
 * @access Public
 */
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    // Compare passwords
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    // console.log(email,password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong Credentials"));
    }

    // Generate JWT Token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const { password: pass, ...rest } = validUser._doc;

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    })
      .status(200)
      .json({
        success: true,
        message: "Login Successful!",
        token, // Send token to frontend
        user: rest,
      });

  } catch (error) {
    next(error);
  }
};

/**
 * @desc User Signout
 * @route GET /api/auth/signout
 * @access Private
 */
export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Middleware to Verify Token
 */
export const verifyToken = (req, res, next) => {
  let token = req.cookies.access_token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(errorHandler(401, "Unauthorized - Token not provided"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(403, "Forbidden - Invalid Token"));
    }

    req.user = user;
    next();
  });
};
