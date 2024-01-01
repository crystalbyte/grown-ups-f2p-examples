using System;
using System.Collections;
using System.Threading.Tasks;
using System.Runtime.InteropServices;
using UnityEngine;

namespace GrownUps
{
    public sealed class GrownUpsAuthReceiver : MonoBehaviour
    {
        public void Start()
        {
            var token = JsMethods.RequestUserToken();
        }

        public void OnError(string message)
        {
            Debug.Log($"<color=red>Error: {message}</color>");
        }

        private class JsMethods
        {
            [DllImport("__Internal")]
            public static extern string RequestUserToken();
        }
    }
}