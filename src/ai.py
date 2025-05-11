import json
import boto3
import botocore
from IPython.display import display, Markdown
import time
import os

# Initialize Bedrock client

session = boto3.session.Session()

region = 'us-west-2'
bedrock = boto3.client(service_name='bedrock-runtime', region_name=region)

# Define model IDs that will be used in this module
MODELS = {
    "Claude 3.7 Sonnet": "us.anthropic.claude-3-7-sonnet-20250219-v1:0",
    "Claude 3.5 Sonnet": "us.anthropic.claude-3-5-sonnet-20240620-v1:0",
    "Claude 3.5 Haiku": "us.anthropic.claude-3-5-haiku-20241022-v1:0",
    "Amazon Nova Pro": "us.amazon.nova-pro-v1:0",
    "Amazon Nova Micro": "us.amazon.nova-micro-v1:0",
    "DeepSeek-R1": "us.deepseek.r1-v1:0",
    "Meta Llama 3.1 70B Instruct": "us.meta.llama3-1-70b-instruct-v1:0"
}

# Utility function to display model responses in a more readable format
def display_response(response, model_name=None):
    if model_name:
        display(Markdown(f"### Response from {model_name}"))
    display(Markdown(response))
    print("\n" + "-"*80 + "\n")

# Specify the path to your text file
file_path = "src/notes.txt"

# Open and read the file
with open(file_path, 'r', encoding='utf-8') as file:
    file_contents = file.read()


text_to_summarize = file_contents

# response = bedrock.invoke_model(**kwargs)

# body = json.loads(response['body'].read())

# print(body)

# Create prompt for summarization
prompt = f"""You are an AI assistant that helps generate study guides. Given the following notes, respond with relevant terms and their definitions, as well as questions and answers.
Do not add any information that is not mentioned in the text below.
<text>
{text_to_summarize}
</text>
"""

# Create request body for Claude 3.7 Sonnet
claude_body = json.dumps({
    "anthropic_version": "bedrock-2023-05-31",
    "max_tokens": 1000,
    "temperature": 0.5,
    "top_p": 0.9,
    "messages": [
        {
            "role": "user",
            "content": [{"type": "text", "text": prompt}]
        }
    ],
})

kwargs = {
  "modelId": "anthropic.claude-3-7-sonnet-20250219-v1:0",
  "contentType": "application/json",
  "accept": "application/json",
  "body": json.dumps({
    "anthropic_version": "bedrock-2023-05-31",
    "max_tokens": 200,
    "top_k": 250,
    "stop_sequences": [],
    "temperature": 1,
    "top_p": 0.999,
    "messages": [
      {
        "role": "user",
        "content": [{"type": "text", "text": prompt}]
      }
    ]
  })
}

# Send request to Claude 3.7 Sonnet
try:
    response = bedrock.invoke_model(
        modelId=MODELS["Claude 3.7 Sonnet"],
        body=claude_body,
        accept="application/json",
        contentType="application/json"

    )
    # modelId=MODELS["Claude 3.7 Sonnet"],
    #     body=claude_body,
    #     accept="application/json",
    #     contentType="application/json"
    response_body = json.loads(response.get('body').read())
    
    # Extract and display the response text
    claude_summary = response_body["content"][0]["text"]
    display_response(claude_summary, "Claude 3.7 Sonnet (Invoke Model API)")
    print(claude_summary)
    
except botocore.exceptions.ClientError as error:
    if error.response['Error']['Code'] == 'AccessDeniedException':
        print(f"\x1b[41m{error.response['Error']['Message']}\
            \nTo troubleshoot this issue please refer to the following resources.\
            \nhttps://docs.aws.amazon.com/IAM/latest/UserGuide/troubleshoot_access-denied.html\
            \nhttps://docs.aws.amazon.com/bedrock/latest/userguide/security-iam.html\x1b[0m\n")
    else:
        raise error