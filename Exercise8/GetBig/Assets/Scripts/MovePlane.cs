using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MovePlane : MonoBehaviour
{
    public float Speed;

    private float _maxAngle = 45f;
    private float _minAngle = -45f;
    
    private float _hValue;
    private float _vValue;

    private float _angleInDegrees;
    private Vector3 _rotationAxis;
    private Vector3 _angularDisplacement;
    private Vector3 _angularVelocity;

    private Rigidbody _rigidbody;
    private Vector3 _targetRotation;

    private void Start()
    {
        _rigidbody = GetComponent<Rigidbody>();
        _targetRotation = Vector3.zero;
    }

    private void FixedUpdate()
    {
        _hValue = Input.GetAxis("Horizontal");
        _vValue = Input.GetAxis("Vertical");

        if (_hValue != 0f || _vValue != 0f)
        {
            Rotate();
        }
        
        AdjustAngle();
    }

    private void Rotate()
    {
        _targetRotation = Vector3.zero;

        if (_hValue != 0f)
        {
            _targetRotation.z = (_hValue > 0f ? -Speed : Speed) * Time.deltaTime;

        }

        if (_vValue != 0f)
        {
            _targetRotation.x =(_vValue > 0f ? Speed : -Speed) * Time.deltaTime;
        }

        if (_targetRotation != Vector3.zero)
        {
            transform.Rotate(_targetRotation);
            // var quaternion = Quaternion.Euler(_targetRotation);
            // var rotationDelta = quaternion * Quaternion.Inverse(transform.rotation);
            // rotationDelta.ToAngleAxis(out _angleInDegrees, out _rotationAxis);
            // _angularDisplacement = _rotationAxis * _angleInDegrees * Mathf.Deg2Rad;
            // _angularVelocity = _angularDisplacement / Time.fixedDeltaTime * Speed;
            // _rigidbody.angularVelocity = _angularVelocity;
        }
    }

    private void AdjustAngle()
    {
        var euler = transform.eulerAngles;
        var angle = CheckAngle(euler.x);
        if (angle > _maxAngle || angle < _minAngle)
        {
            euler.x = Mathf.Clamp(angle, _minAngle, _maxAngle);
            transform.eulerAngles = euler;
        }
            
        angle = CheckAngle(euler.z);
        if (angle > _maxAngle || angle < _minAngle)
        {
            euler.z = Mathf.Clamp(angle, _minAngle, _maxAngle);
            transform.eulerAngles = euler;
        }
    }
    
    private float CheckAngle(float value)
    {
        var angle = value - 180f;
        if (angle > 0)
        {
            return angle - 180f;
        }

        return angle + 180f;
    }
}