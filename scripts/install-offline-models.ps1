param(
    [string]$Destination = (Join-Path $PSScriptRoot "..\private-data\models")
)

$ErrorActionPreference = "Stop"

$models = @(
    @{
        Path = "smollm2-360m-instruct\smollm2-360m-instruct-q8_0.gguf"
        Url = "https://huggingface.co/HuggingFaceTB/SmolLM2-360M-Instruct-GGUF/resolve/main/smollm2-360m-instruct-q8_0.gguf"
        Sha256 = "48ab3034d0dd401fbc721eb1df3217902fee7dab9078992d66431f09b7750201"
    },
    @{
        Path = "smollm2-1.7b-instruct\onnx\model_q4.onnx"
        Url = "https://huggingface.co/HuggingFaceTB/SmolLM2-1.7B-Instruct/resolve/main/onnx/model_q4.onnx"
        Sha256 = "467b7b8f62d99f184d3628d24b8d65c151e331695f6e9ea997616c4e279e9a51"
    },
    @{
        Path = "qwen3-embedding-0.6b\model.safetensors"
        Url = "https://huggingface.co/Qwen/Qwen3-Embedding-0.6B/resolve/main/model.safetensors"
        Sha256 = "0437e45c94563b09e13cb7a64478fc406947a93cb34a7e05870fc8dcd48e23fd"
    },
    @{
        Path = "qwen3-0.6b\Qwen3-0.6B-Q8_0.gguf"
        Url = "https://huggingface.co/Qwen/Qwen3-0.6B-GGUF/resolve/main/Qwen3-0.6B-Q8_0.gguf"
        Sha256 = "9465e63a22add5354d9bb4b99e90117043c7124007664907259bd16d043bb031"
    }
)

foreach ($model in $models) {
    $target = Join-Path $Destination $model.Path
    New-Item -ItemType Directory -Force -Path (Split-Path $target) | Out-Null
    Write-Host "Downloading $($model.Path)"
    & curl.exe -L --fail --retry 3 -C - -o $target $model.Url
    if ($LASTEXITCODE -ne 0) {
        throw "Download failed: $($model.Url)"
    }
    $actualHash = (Get-FileHash -Algorithm SHA256 $target).Hash.ToLowerInvariant()
    if ($actualHash -ne $model.Sha256) {
        throw "Checksum mismatch for $target. Delete the damaged file and run this installer again."
    }
}

$supportFiles = @(
    @("smollm2-1.7b-instruct\config.json", "HuggingFaceTB/SmolLM2-1.7B-Instruct/config.json"),
    @("smollm2-1.7b-instruct\generation_config.json", "HuggingFaceTB/SmolLM2-1.7B-Instruct/generation_config.json"),
    @("smollm2-1.7b-instruct\tokenizer.json", "HuggingFaceTB/SmolLM2-1.7B-Instruct/tokenizer.json"),
    @("smollm2-1.7b-instruct\tokenizer_config.json", "HuggingFaceTB/SmolLM2-1.7B-Instruct/tokenizer_config.json"),
    @("qwen3-embedding-0.6b\config.json", "Qwen/Qwen3-Embedding-0.6B/config.json"),
    @("qwen3-embedding-0.6b\config_sentence_transformers.json", "Qwen/Qwen3-Embedding-0.6B/config_sentence_transformers.json"),
    @("qwen3-embedding-0.6b\modules.json", "Qwen/Qwen3-Embedding-0.6B/modules.json"),
    @("qwen3-embedding-0.6b\tokenizer.json", "Qwen/Qwen3-Embedding-0.6B/tokenizer.json"),
    @("qwen3-embedding-0.6b\tokenizer_config.json", "Qwen/Qwen3-Embedding-0.6B/tokenizer_config.json"),
    @("qwen3-embedding-0.6b\1_Pooling\config.json", "Qwen/Qwen3-Embedding-0.6B/1_Pooling/config.json")
)

foreach ($supportFile in $supportFiles) {
    $target = Join-Path $Destination $supportFile[0]
    New-Item -ItemType Directory -Force -Path (Split-Path $target) | Out-Null
    & curl.exe -L --fail --retry 3 -sS -o $target ("https://huggingface.co/" + $supportFile[1] -replace "/([^/]+)$", "/resolve/main/`$1")
    if ($LASTEXITCODE -ne 0) { throw "Support-file download failed: $($supportFile[1])" }
}

Write-Host "Offline base models installed in $([IO.Path]::GetFullPath($Destination))"

$hostedModelDirectory = Join-Path $PSScriptRoot "..\assets\models"
$hostedModel = Join-Path $hostedModelDirectory "home-assistant-smollm2-360m-q8_0.gguf"
$compactModel = Join-Path $Destination "smollm2-360m-instruct\smollm2-360m-instruct-q8_0.gguf"
New-Item -ItemType Directory -Force -Path $hostedModelDirectory | Out-Null
if (-not (Test-Path $hostedModel)) {
    New-Item -ItemType HardLink -Path $hostedModel -Target $compactModel | Out-Null
}
Write-Host "Firebase-ready model asset available at $([IO.Path]::GetFullPath($hostedModel))"
