using Microsoft.VisualBasic.FileIO;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace XLSolutions.Core
{
    public static class CSVFileVerifier
    {
        public static void Dunkens2(string[] args)
        {
            string path = @"../csvtest.csv";
            byte[] buffer = File.ReadAllBytes(path);

            //var file = File.OpenRead(path, FileOptions.SequentialScan);


            char[] charbuffer = new char[buffer.Length];
            bool bl = true;
            int idk = 0;
            int f = 0;
            StringBuilder sb = new StringBuilder();

            Decoder decoder = UTF8Encoding.ASCII.GetDecoder();

            decoder.Convert(buffer, 0, buffer.Length, charbuffer, 0, charbuffer.Length,
                            true, out idk, out f, out bl);

            //PrintOutTabbleFormat(buffer, 16);
            CSVCheck(path);

        }

        private static void CSVCheck(string path)
        {
            using (var parser = new TextFieldParser(path))
            {
                parser.TextFieldType = FieldType.Delimited;
                parser.SetDelimiters(",");

                string[] line;
                while (!parser.EndOfData)
                {
                    try
                    {
                        line = parser.ReadFields();
                    }
                    catch (MalformedLineException ex)
                    {
                        //..
                    }
                }
            }
        }
        //Only meant for console visual testing of hex table output
        private static void PrintOutTabbleFormat(byte[] buffer, int collums)
        {
            int ln = buffer.Length;
            int count = 0;
            int _count = 0;
            while (count < ln)
            {
                for (int j = _count; j < (_count + collums); j++)
                {
                    Console.Write(buffer[j].ToString("X2") + " ");
                    count++;
                    if (count == ln)
                        break;
                }
                Console.Write("\n");
                _count = count;
            }
        }
    }
}
