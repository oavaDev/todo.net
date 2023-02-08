using System;
using System.Collections.Generic;

namespace proyectreact.Models;

public partial class Task
{
    public int IdTask { get; set; }

    public string? Payload { get; set; }

    public DateTime? RegisterDate { get; set; }
}
