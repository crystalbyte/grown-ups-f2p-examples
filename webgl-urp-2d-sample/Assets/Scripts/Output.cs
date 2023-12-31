using System;
using TMPro;
using UnityEngine;

namespace GrownUps
{
    [RequireComponent(typeof(TMP_InputField))]
    public class Output : MonoBehaviour
    {
        private TMP_InputField input;
        // Start is called before the first frame update
        public void Awake()
        {
            input = GetComponent<TMP_InputField>();
            input.text = "";
        }

        public void WriteLine(string text, Color? color = null)
        {
            var time = DateTime.Now;
            color ??= Color.white;
            var hex = ColorUtility.ToHtmlStringRGB(color.Value);
            input.text += $"<color=#{hex}>[{time}] {text}</color><br>";
        }
    }
}