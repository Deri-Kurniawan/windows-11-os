import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import assets from "../assets";
import { useWindows } from "../providers/WindowsProvider";
import { motion } from "framer-motion";
import { VscEye } from "react-icons/vsc";

const SignInWithPIN = () => {
  const { settings }: any = useWindows();
  const router = useRouter();

  const [PIN, setPIN] = React.useState<string>("");
  const [PINIsError, setPINIsError] = React.useState<boolean>(false);
  const [PINPairedCorrect, setPINPairedCorrect] =
    React.useState<boolean>(false);

  const refInputPIN = React.useRef<HTMLInputElement>(null);

  const handleChangePIN = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "").trim();
    setPIN(e.target.value);
  };

  const handleClickRevealPIN = (): void => {
    if (refInputPIN.current?.type === "password") {
      refInputPIN.current.setAttribute("type", "text");
      refInputPIN.current.focus();
    } else if (refInputPIN.current?.type === "text") {
      refInputPIN.current.setAttribute("type", "password");
      refInputPIN.current.focus();
    }
  };

  const handleOnClickForgotPIN = (): void => {
    const answer = window.confirm(
      `PIN is ${settings.accounts.signInOptions.PIN.key}\nDo you want to auto fill PIN?`
    );

    if (answer) {
      setPIN(settings.accounts.signInOptions.PIN.key);
    }

    refInputPIN.current?.focus();
  };

  useEffect(() => {
    if (PIN.length === settings.accounts.signInOptions.PIN.length) {
      if (PIN === settings.accounts.signInOptions.PIN.key) {
        setPIN("");
        setPINIsError(false);
        setPINPairedCorrect(true);

        setTimeout(() => {
          router.push("/desktop");
        }, 2000);
      } else {
        setPIN("");
        setPINIsError(true);
      }
    }
  }, [PIN]);

  return (
    <>
      <div className="absolute top-0 left-0 z-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-row justify-center items-center w-screen h-screen backdrop-blur-xl"
        >
          <div className="flex flex-1 flex-col items-center justify-center text-dark dark:text-light">
            <Image
              className="h-48 w-48 rounded-full"
              src={settings.accounts.yourInfo.avatar}
              loader={({ src }) => src}
              alt="user_avatar"
              width={192}
              height={192}
              unoptimized
            />
            <h1 className="mt-4 text-2xl font-semibold">
              {settings.accounts.yourInfo.name}
            </h1>
            {PINPairedCorrect === true ? (
              <div className="flex flex-col items-center">
                <Image
                  src={assets.loading.spinner1}
                  alt="loading_spinner"
                  width={48}
                  height={48}
                />
                <h2 className="mt-2 text-xl font-semibold">Welcome</h2>
              </div>
            ) : (
              <>
                {PINIsError === true ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-7"
                    >
                      The PIN is incorrect. Try again.
                    </motion.div>
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-7 cursor-pointer rounded-md border-[1px] border-black bg-white bg-opacity-30 px-14 py-2 text-center ring-2 ring-white backdrop-blur-xl active:bg-opacity-20"
                      onClick={() => setPINIsError(false)}
                      autoFocus
                    >
                      <span className="font-semibold">OK</span>
                    </motion.button>
                  </>
                ) : (
                  <>
                    <div className="mt-7 rounded-sm bg-gray-500 bg-opacity-80 backdrop-blur-xl">
                      <motion.input
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        ref={refInputPIN}
                        className="h-[2em] w-[15em] rounded-sm bg-transparent px-2 pr-[1.85em] text-white placeholder-white md:w-[20em] border-b-[1px] border-blue-400"
                        type="password"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={6}
                        placeholder="PIN"
                        onChange={handleChangePIN}
                        autoFocus
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                      />
                      <div
                        className={`${
                          PIN.length > 0 ? "absolute" : "hidden"
                        } absolute top-[2.5px] right-[2px] p-1 text-white`}
                      >
                        <button onClick={handleClickRevealPIN}>
                          <VscEye size={18} />
                        </button>
                      </div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 cursor-pointer p-1 hover:text-opacity-70 text-dark dark:text-light"
                      onClick={handleOnClickForgotPIN}
                    >
                      I forgot my PIN
                    </motion.div>
                  </>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SignInWithPIN;
