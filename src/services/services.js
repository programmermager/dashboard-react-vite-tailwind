import { toast } from "sonner";
import { supabase, SupabaseRpc } from "../lib/helper/supabase-client";

async function checkUser(email) {
  const { data } = await supabase.rpc(SupabaseRpc.checkEmail, {
    email_input: email,
  });
  return data;
}

export async function uploadAvatar(e, id) {
  const file = e.photo[0];
  const fileExt = file.name.split(".").pop();
  const fileName = `${id}.${fileExt}`;
  const filePath = `${fileName}`;

  const response = await supabase.storage
    .from("avatars")
    .upload(filePath, e.photo[0], {
      upsert: true,
      contentType: "image/jpeg",
    });

  return response;
}

export async function signUpNewUser({ body }) {
  var img = `https://avatar.iran.liara.run/username?username=${body["name"]}`;
  if (body.photo[0]) {
    const response = await uploadAvatar(body);

    if (!response.error) {
      const { data } = await supabase.storage
        .from("avatars")
        .getPublicUrl(response.data.path);
      console.log(`upload === ${data.publicUrl}`);

      img = data.publicUrl;
    }
  }

  const isExist = await checkUser(body["email"]);
  if (!isExist) {
    const response = await supabase.auth.signUp({
      email: body.email,
      password: body.password,
      options: {
        data: {
          name: body.name,
          role: "user",
          image: img,
        },
      },
    });

    return response;
  } else {
    toast.error(
      `Email ${body.email} sudah terdaftar, silahkan gunakan email lain`,
    );
  }
}

export async function getLocalUser() {
  const userStr = localStorage.getItem("user");
  const userr = JSON.parse(userStr);
  console.log(`local user ${JSON.stringify(userr)}`);
  return userr;
}

export async function getUserById(id) {
  const response = await supabase.rpc("get_user_by_id", {
    uid: id,
  });

  if (!response.error) {
    localStorage.setItem("user", JSON.stringify(response.data[0]));
  }
  return response;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (!error) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  return error;
}
