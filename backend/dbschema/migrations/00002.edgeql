CREATE MIGRATION m1bdsjyjrbtf7kdbfo63bcegkquxr5q6n72isvecnu3pic44fnpqea
    ONTO m1xczcmmes2iqaz55jtm5nk7otp5tmd2lfea475wqddvrzellswpmq
{
  ALTER TYPE default::User {
      CREATE REQUIRED PROPERTY email -> std::str {
          SET REQUIRED USING ('');
      };
  };
  ALTER TYPE default::User {
      ALTER PROPERTY first_name {
          RESET OPTIONALITY;
      };
  };
  ALTER TYPE default::User {
      ALTER PROPERTY last_name {
          RESET OPTIONALITY;
      };
  };
};
