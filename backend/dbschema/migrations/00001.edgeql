CREATE MIGRATION m1xczcmmes2iqaz55jtm5nk7otp5tmd2lfea475wqddvrzellswpmq
    ONTO initial
{
  CREATE TYPE default::User {
      CREATE REQUIRED PROPERTY first_name -> std::str;
      CREATE REQUIRED PROPERTY last_name -> std::str;
  };
};
