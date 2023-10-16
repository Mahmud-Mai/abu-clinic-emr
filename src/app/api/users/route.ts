import User from "@/models/user";
import { UserProps } from "@/types";
import { connectdb } from "@/utils/db";
import { type NextResponse, type NextRequest } from "next/server";

export const GET = async () => {
  try {
    await connectdb();
    const users = await User.find();
    if (!users) {
      return new Response("No Users found", {
        status: 404,
      });
    }
    return new Response(users, {
      status: 200,
    });
  } catch (error) {
    return new Response("Internal Server Error!", {
      status: 500,
    });
  }
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    await connectdb();
    const { firstName, lastName, contactInfo, password }: UserProps =
      await req.json();

    if (!firstName || !lastName || !contactInfo || !password) {
      return new Response("Some parameters are missing", {
        status: 400,
      });
    }
    const userExist = await User.findOne(contactInfo.email);
    if (userExist) {
      return new Response("User alreeady exist!!", {
        status: 400,
      });
    }

    User.firstName = firstName;
    User.lastName = lastName;
    User.password = password;
    User.contactInfo = contactInfo;
    await User.save();

    return new Response("Created User Successfully!", {
      status: 200,
    });
  } catch (error) {
    return new Response("Internal Server Error!", {
      status: 500,
    });
  }
};
