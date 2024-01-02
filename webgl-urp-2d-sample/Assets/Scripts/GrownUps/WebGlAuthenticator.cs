using System;
using System.Collections;
using System.Threading.Tasks;
using System.Runtime.InteropServices;
using UnityEngine;

namespace GrownUps
{
    public sealed class WebGlAuthenticator : MonoBehaviour
    {
        public WebGlAuthenticator()
        {
            if (Instance == null)
            {
                Instance = this;
            }
        }

        public Output Output;
        public static WebGlAuthenticator Instance;

        public void Start()
        {
            JsMethods.SignIn();
        }

        public static void SignInSucceeded(string token)
        {
            Instance.Output.WriteLine($"<color=#69f0ae>Sign in successful. <br>{token}</color>");
        }

        public static void SignInFailed(string error)
        {
            Instance.Output.WriteLine($"<color=red>Error: {error}</color>");
        }

        private class JsMethods
        {
            [DllImport("__Internal")]
            public static extern string SignIn();
        }
    }
}