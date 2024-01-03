using System;
using System.Text;
using System.Linq;
using System.Collections;
using System.Threading.Tasks;
using System.Runtime.InteropServices;
using System.IdentityModel.Tokens.Jwt;
using UnityEngine;

namespace GrownUps
{
    public sealed class WebGlAuthenticator : MonoBehaviour
    {
        private static Color mintGreen = new Color(105 / 255.0f, 240 / 255.0f, 174 / 255.0f);
        private static Color tomatoRed = new Color(255 / 255.0f, 99 / 255.0f, 71 / 255.0f);

        public Output Output;

        public void Start()
        {
            JsMethods.RequestAuthToken();
        }

        public void OnRequestSucceeded(string jwt)
        {
            try
            {
                var handler = new JwtSecurityTokenHandler();
                var token = handler.ReadJwtToken(jwt);

                Output.WriteLine($"Token successfully acquired.", mintGreen);

                var claim = token.Claims.First(x => x.Type == "name");
                Output.WriteLine($"Welcome {claim.Value}");
            }
            catch (Exception e)
            {
                Output.WriteLine(e.Message, tomatoRed);
            }

        }

        public void OnRequestFailed(string error)
        {
            Output.WriteLine(error, tomatoRed);
        }

        private class JsMethods
        {
            [DllImport("__Internal")]
            public static extern string SignIn();

            [DllImport("__Internal")]
            public static extern string RequestAuthToken();
        }
    }
}