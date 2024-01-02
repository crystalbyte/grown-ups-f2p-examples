using System;
using System.Collections;
using System.Threading.Tasks;
using System.Runtime.InteropServices;
using UnityEngine;

namespace GrownUps
{
    public sealed class WebGlAuthenticator : MonoBehaviour
    {
        public Output Output;

        public void Start()
        {
            JsMethods.SignIn();
        }

        public void SignInSucceeded(string token)
        {
            Output.WriteLine($"<color=#69f0ae>Sign in successful. <br>{token}</color>");
        }

        public void SignInFailed(string error)
        {
            Output.WriteLine($"<color=red>Error: {error}</color>");
        }

        private class JsMethods
        {
            [DllImport("__Internal")]
            public static extern string SignIn();
        }
    }
}