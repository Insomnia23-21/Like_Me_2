const URL_API = "http://localhost:3000/posts";

export const getPosts = async () => {
  try {
    const response = await fetch(URL_API);
    if (!response.ok) {
      throw new Error("Error al obtener los posts");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getPosts:", error);
    throw error;
  }
};

export const addPost = async (post) => {
  try {
    const response = await fetch(URL_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    if (!response.ok) {
      throw new Error("Error al crear el post");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en addPost:", error);
    throw error;
  }
};

export const updatePost = async (id, updatedData) => {
  try {
    const response = await fetch(`${URL_API}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error("Error al actualizar el post");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en updatePost:", error);
    throw error;
  }
};

export const deletePost = async (id) => {
  try {
    const response = await fetch(`${URL_API}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error al eliminar el post");
    }
  } catch (error) {
    console.error("Error en deletePost:", error);
    throw error;
  }
};

export const likePost = async (id) => {
  try {
    const response = await fetch(`${URL_API}/like/${id}`, {
      method: "PUT",
    });
    if (!response.ok) {
      throw new Error("Error al dar like al post");
    }
  } catch (error) {
    console.error("Error en likePost:", error);
    throw error;
  }
};
