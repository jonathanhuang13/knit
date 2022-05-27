module default {
  type User {
    property first_name -> str;
    property last_name -> str;
    required property email -> str;
  }
}
